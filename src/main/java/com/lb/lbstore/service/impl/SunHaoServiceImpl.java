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
        String sql = "select (1) from SunHao where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
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
