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
        String sql = "select (1) from TuiHuo where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return tuiHuoDao.getCount(sql, null);
    }

    @Override
    public List<TuiHuo> queryTuiHuosByPage(HashMap map) {
        return tuiHuoDao.queryTuiHuosByPage(map);
    }

    @Override
    public String dealTuiHuo(TuiHuo tuiHuo,Integer a01_id) {
        return tuiHuoDao.dealTuiHuo(tuiHuo, a01_id);
    }
    
    @Override
    public int queryFeiRows(HashMap map) {
        String sql = "select (1) from TuiHuoFei where th_id="+map.get("th_id");
        return tuiHuoDao.getCount(sql, null);
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
    public boolean deleteTuiHuoFei(Integer id,Integer th_id) {
        return tuiHuoDao.deleteTuiHuoFei(id, th_id);
    }


}
