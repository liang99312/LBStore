/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.TuiHuoDao;
import com.lb.lbstore.domain.TuiHuo;
import com.lb.lbstore.domain.TuiHuoFei;
import com.lb.lbstore.service.TuiHuoService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("tuiHuoServiceImpl")
public class TuiHuoServiceImpl implements TuiHuoService {

    @Autowired
    private TuiHuoDao tuiHuoDao;

    @Override
    public TuiHuo getTuiHuoById(Integer id) {
        return (TuiHuo) tuiHuoDao.findObjectById(TuiHuo.class, id);
    }

    @Override
    public TuiHuo getTuiHuoDetailById(Integer id) {
        return tuiHuoDao.getTuiHuoDetailById(id);
    }

    @Override
    public boolean updateTuiHuo(TuiHuo tuiHuo) {
        return tuiHuoDao.updateTuiHuo(tuiHuo);
    }

    @Override
    public TuiHuo saveTuiHuo(TuiHuo tuiHuo) {
        int id = tuiHuoDao.saveTuiHuo(tuiHuo);
        return (TuiHuo) tuiHuoDao.findObjectById(TuiHuo.class, id);
    }

    @Override
    public boolean deleteTuiHuo(Integer id) {
        return tuiHuoDao.deleteTuiHuo(id);
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from TuiHuo where qy_id=?";
        if (map.containsKey("ck_id")) {
            sql += " and ck_id = ?";
            parameters.add(map.get("ck_id"));
        }
        if (map.containsKey("lsh")) {
            sql += " and lsh like '%?%'";
            parameters.add(map.get("lsh"));
        }
        if (map.containsKey("wz")) {
            sql += " and wz like '%?%'";
            parameters.add(map.get("wz"));
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        if (map.containsKey("kh_id")) {
            sql += " and kh_id = ?";
            parameters.add(map.get("kh_id"));
        }
        if (map.containsKey("gys_id")) {
            sql += " and gys_id = ?";
            parameters.add(map.get("gys_id"));
        }
        if (map.containsKey("qrq")) {
            sql += " and sj >= '?'";
            parameters.add(map.get("qrq"));
        }
        if (map.containsKey("zrq")) {
            sql += " and sj <= '?'";
            parameters.add(map.get("zrq") + " 23:59:59");
        }
        return tuiHuoDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<TuiHuo> queryTuiHuosByPage(HashMap map) {
        return tuiHuoDao.queryTuiHuosByPage(map);
    }

    @Override
    public String dealTuiHuo(TuiHuo tuiHuo, Integer a01_id) {
        return tuiHuoDao.dealTuiHuo(tuiHuo, a01_id);
    }

    @Override
    public int queryFeiRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("th_id"));
        String sql = "select count(1) from TuiHuoFei where th_id=" + map.get("th_id");
        return tuiHuoDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<TuiHuoFei> queryTuiHuoFeisByPage(HashMap map) {
        return tuiHuoDao.queryTuiHuoFeisByPage(map);
    }

    @Override
    public TuiHuoFei getTuiHuoFeiById(Integer id) {
        return (TuiHuoFei) tuiHuoDao.findObjectById(TuiHuoFei.class, id);
    }

    @Override
    public boolean updateTuiHuoFei(TuiHuoFei tuiHuoFei) {
        return tuiHuoDao.updateTuiHuoFei(tuiHuoFei);
    }

    @Override
    public TuiHuoFei saveTuiHuoFei(TuiHuoFei tuiHuoFei) {
        int id = tuiHuoDao.saveTuiHuoFei(tuiHuoFei);
        return (TuiHuoFei) tuiHuoDao.findObjectById(TuiHuoFei.class, id);
    }

    @Override
    public boolean deleteTuiHuoFei(Integer id, Integer th_id) {
        return tuiHuoDao.deleteTuiHuoFei(id, th_id);
    }

}
