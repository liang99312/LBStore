/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.SunHaoDao;
import com.lb.lbstore.domain.SunHao;
import com.lb.lbstore.service.SunHaoService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("sunHaoServiceImpl")
public class SunHaoServiceImpl implements SunHaoService {

    @Autowired
    private SunHaoDao sunHaoDao;

    @Override
    public SunHao getSunHaoById(Integer id) {
        return (SunHao) sunHaoDao.findObjectById(SunHao.class, id);
    }
    
    @Override
    public SunHao getSunHaoDetailById(Integer id) {
        return  sunHaoDao.getSunHaoDetailById(id);
    }

    @Override
    public boolean updateSunHao(SunHao sunHao) {
        return sunHaoDao.updateSunHao(sunHao);
    }

    @Override
    public SunHao saveSunHao(SunHao sunHao) {
        int id = sunHaoDao.saveSunHao(sunHao);
        return (SunHao) sunHaoDao.findObjectById(SunHao.class, id);
    }

    @Override
    public boolean deleteSunHao(Integer id) {
        return sunHaoDao.deleteSunHao(id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select count(1) from SunHao where qy_id="+map.get("qy_id");
        if (map.containsKey("ck_id")) {
            sql += " and ck_id = " + map.get("ck_id");
        }
        if (map.containsKey("lsh")) {
            sql += " and lsh like '%" + map.get("lsh") + "%'";
        }
        if (map.containsKey("wz")) {
            sql += " and wz like '%" + map.get("wz") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        if (map.containsKey("kh_id")) {
            sql += " and kh_id = " + map.get("kh_id");
        }
        if (map.containsKey("gys_id")) {
            sql += " and gys_id = " + map.get("gys_id");
        }
        if (map.containsKey("qrq")) {
            sql += " and sj >= '" + map.get("qrq") + "'";
        }
        if (map.containsKey("zrq")) {
            sql += " and sj <= '" + map.get("zrq") + " 23:59:59'";
        }
        return sunHaoDao.getCount(sql, null);
    }

    @Override
    public List<SunHao> querySunHaosByPage(HashMap map) {
        return sunHaoDao.querySunHaosByPage(map);
    }

    @Override
    public boolean dealSunHao(SunHao sunHao,Integer a01_id) {
        return sunHaoDao.dealSunHao(sunHao, a01_id);
    }

}
